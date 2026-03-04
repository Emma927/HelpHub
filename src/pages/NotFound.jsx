// 404 Not Found page component with a redirect link to home
function NotFound() {
  return (
      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
        <img
          src="/NotFound404.webp"
          alt="Page not found"
          className="not-found"
        />
        <div className="text-center mb-3 fs-3">
          <a href="/">Wracaj do nas!</a>
        </div>
      </div>
  );
}

export default NotFound;
