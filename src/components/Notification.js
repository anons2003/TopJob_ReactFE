import React from 'react';

export default function Notification({ message, type, visible }) {
    if (!visible) return null;

    return (
        <div className={`alert alert-${type === "success" ? "success" : "danger"}`} role="alert">
            {message}
        </div>
    );
}
