import React, { useState, useEffect } from "react";
import { axiosInstance } from '../Lib/axios'; // Adjust path as needed
import Swal from 'sweetalert2';
import Header from '../Components/Dashboard/Header';
import SearchAndFilter from '../Components/Dashboard/SearchAndFilter';
import NotesGrid from '../Components/Dashboard/NotesGrid';
import Modal from '../Components/Dashboard/Modal';
import EmptyNotes from '../Components/Dashboard/EmptyNotes';
import Loading from '../Components/Dashboard/Loading';
import { useNavigate } from 'react-router-dom';

const NotesDashboard = ({handleLogout}) => {
  // State management
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate();

  // Fetch user-specific notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (!userId) {
          throw new Error('User not found. Please log in.');
        }
        const response = await axiosInstance.get(`/note/get-notes/${userId}`);
        console.log(response)
        // Map _id to id for consistency in frontend
        const notesWithId = (response.data.notes || []).map(note => ({
          ...note,
          id: note._id
        }));
        setNotes(notesWithId);
      } catch (error) {
        console.error('Error fetching notes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to fetch notes.',
        });
        setNotes([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on search term and category
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort notes - pinned first, then by updated date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  // Navigate to note editor for creating new note
  const handleCreateNote = () => {
    navigate('/editor');
  };

  // Navigate to note editor for editing existing note
  const handleEditNote = (noteId) => {
    navigate(`/editor/${noteId}`);
  };

  // Open full note view modal
  const handleViewNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  // Close the full note view modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  // Delete a note from the backend and update state
  const handleDeleteNote = async (noteId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/note/delete-note/${noteId}`);
        setNotes(notes.filter(note => note.id !== noteId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Note deleted successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error deleting note:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to delete note.',
        });
      }
    }
  };

  // Toggle pin status via backend
  const togglePin = async (noteId) => {
    try {
      const noteToUpdate = notes.find(note => note.id === noteId);
      console.log('working',noteToUpdate)
      if (!noteToUpdate) return;

      const response = await axiosInstance.put(`/note/toggle-pin/${noteId}`, {
        isPinned: !noteToUpdate.isPinned,
      });
      // Map _id to id for consistency
      const updatedNote = {
        ...response.data.note,
        id: response.data.note._id
      };
      setNotes(notes.map(note => 
        note.id === noteId ? updatedNote : note
      ));
      
      // Update selectedNote if it's the one being toggled
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(updatedNote);
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update pin status.',
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get category-specific styling
  const getCategoryColor = (category) => {
    const colors = {
      work: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200',
      personal: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200',
      learning: 'bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-200'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200';
  };

  const categories = ['all', 'work', 'personal', 'learning', 'ideas', 'todo'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with app branding and create button */}
     <Header handleCreateNote={handleCreateNote} handleLogout={handleLogout} />
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} notes={notes} sortedNotes={sortedNotes} />
        {/* Notes Display Area */}
        {loading ? (
          // Loading skeleton
          <Loading/>
        ) : sortedNotes.length === 0 ? (
          // Empty state when no notes found
          <EmptyNotes searchTerm={searchTerm} handleCreateNote={handleCreateNote}  />
        ) : (
            <NotesGrid sortedNotes={sortedNotes} handleViewNote={handleViewNote} handleEditNote={handleEditNote} handleDeleteNote={handleDeleteNote} getCategoryColor={getCategoryColor} formatDate={formatDate} togglePin={togglePin}   />
        )}
      </main>
      {/* Full Note View Modal */}
      {isModalOpen && selectedNote && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-black/50"
              onClick={handleCloseModal}
            ></div>
            {/* Modal Content */}
          <Modal selectedNote={selectedNote} handleEditNote={handleEditNote} handleCloseModal={handleCloseModal} formatDate={formatDate} getCategoryColor={getCategoryColor} togglePin={togglePin}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesDashboard;