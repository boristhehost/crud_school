"use client";
export default function ErrorBoundary({ error }) {
  return <div className="error"> {error.message}</div>;
}
