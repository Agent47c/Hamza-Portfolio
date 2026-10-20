import { useState, useEffect } from "react";
import "./styles/Toast.css";

interface ToastData {
  id: number;
  message: string;
  type?: "info" | "success";
}

let toastIdCounter = 0;

export const triggerToast = (message: string, type: "info" | "success" = "success") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolio-toast", {
        detail: { id: ++toastIdCounter, message, type },
      })
    );
  }
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>;
      const newToast = customEvent.detail;
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 2400);
    };

    window.addEventListener("portfolio-toast", handleToast);
    return () => window.removeEventListener("portfolio-toast", handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <span className="toast-icon">✓</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
