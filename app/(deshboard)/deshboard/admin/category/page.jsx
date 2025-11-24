"use client";

import getCookie from "@/utilis/helper/cookie/gettooken";
import { AlertTriangle, Edit3, Loader2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddCategoryPage() {
  const token = getCookie();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    subcategories: [],
  });

  const [subInput, setSubInput] = useState("");

  // --- Fetch All Categories ---
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allcatagory`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) setCategories(data.total || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Add/remove subcategories ---
  const addSubcategory = () => {
    const newSub = subInput.trim();
    if (newSub && !formData.subcategories.includes(newSub)) {
      setFormData((p) => ({
        ...p,
        subcategories: [...p.subcategories, newSub],
      }));
      setSubInput("");
    }
  };

  const removeSubcategory = (name) => {
    setFormData((p) => ({
      ...p,
      subcategories: p.subcategories.filter((s) => s !== name),
    }));
  };

  // --- Reset form ---
  const resetForm = () => {
    setFormData({ categoryName: "", description: "", subcategories: [] });
    setEditMode(false);
    setEditId(null);
  };

  // --- Handle form submission (Add / Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      categoryName: formData.categoryName.trim(),
      description: formData.description.trim(),
      subcategories: formData.subcategories,
    };

    try {
      const endpoint = editMode
        ? `admin/updatecatagory/${editId}`
        : "admin/addcatagory";
      const method = editMode ? "PUT" : "POST";
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(
          editMode ? "✅ Category updated successfully!" : "✅ Category added successfully!"
        );
        resetForm();
        fetchCategories();
      } else toast.error("❌ Operation failed.");
    } catch (error) {
      toast.error("⚠️ Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle edit ---
  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat._id);
    setFormData({
      categoryName: cat.categoryName,
      description: cat.description,
      subcategories: cat.subcategories || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Handle delete confirmation ---
  const confirmDelete = (cat) => setDeleteTarget(cat);

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget._id;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/deletecatagory/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("🗑️ Category deleted successfully!");
        fetchCategories();
      } else toast.error("❌ Failed to delete category.");
    } catch {
      toast.error("⚠️ Network error.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <section className="">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE - Add / Update Category */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[var(--brandBg)]">
          <h2 className="text-2xl font-bold text-[var(--brandColor)] mb-6 flex justify-between items-center">
            {editMode ? "Update Category" : "Add New Category"}
            {editMode && (
              <button
                onClick={resetForm}
                className="text-sm text-gray-500 hover:text-[var(--brandColor)] underline"
              >
                Cancel Edit
              </button>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Category Name
              </label>
              <input
                type="text"
                placeholder="e.g. Electronics"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                required
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[var(--brandColor)]"
              />
            </div>



            {/* Subcategories */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Subcategories
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add subcategory"
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSubcategory())
                  }
                  className="flex-grow border rounded-md px-4 py-2"
                />
                <button
                  type="button"
                  onClick={addSubcategory}
                  className="bg-[var(--brandBg)] text-white px-4 py-2 rounded-md hover:bg-sky-600 transition"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.subcategories.map((sub, i) => (
                  <span
                    key={i}
                    className="bg-[var(--brandBg)] text-white px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {sub}
                    <button type="button" onClick={() => removeSubcategory(sub)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>


            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Description
              </label>
              <textarea
                placeholder="Short category description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                required
                className="w-full border rounded-md px-4 py-2"
              />
            </div>



            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--brandBg)] hover:bg-sky-600 text-white font-semibold py-3 rounded-full transition-all shadow-md mt-4 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Submitting...
                </>
              ) : editMode ? (
                "Update Category"
              ) : (
                "Add Category"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - Category List */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[var(--brandBg)]">
          <h2 className="text-2xl font-bold text-[var(--brandColor)] mb-6">
            Existing Categories ({categories.length})
          </h2>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center">No categories found.</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {cat.categoryName}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => confirmDelete(cat)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {cat.description || "No description"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cat.subcategories?.map((sub, j) => (
                      <span
                        key={j}
                        className="bg-gray-100 border border-gray-200 text-sm text-gray-700 px-3 py-1 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- Modern Delete Confirmation Modal --- */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
            <AlertTriangle
              className="mx-auto text-[var(--brandBg)] mb-3"
              size={42}
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete “{deleteTarget.categoryName}”?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. The category and all its subcategories will
              be permanently deleted.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
