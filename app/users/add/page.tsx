import UserForm from "@/components/UserForm";

export default function AddUserPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>
      <UserForm />
    </div>
  );
}