const Footer = () => {
  return (
    <footer className="footer-zoho mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center py-2">
        
        <span className="text-muted small">
          © {new Date().getFullYear()} Zoho RBAC
        </span>

        <span className="text-muted small">
          Role-Based Access Control · Secure Data Management
        </span>

      </div>
    </footer>
  );
};

export default Footer;