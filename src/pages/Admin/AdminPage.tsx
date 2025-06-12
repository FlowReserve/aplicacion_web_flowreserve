import TodasConsultasList from "./components/TodasConsultasList/TodasConsultasList";

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>This is the admin page where you can manage the application.</p>
      <TodasConsultasList></TodasConsultasList>
    </div>
  );
}
export default AdminPage;