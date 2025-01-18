"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GetEmail = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = async () => {
        if (!email) {
            toast.error("Enter a Valid Email Address", {
                position: "top-center", // Positioned below the input box
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        setIsLoading(true); // Start loading state

        try {
            const response = await axios.post("/api/notify", {
                email,
            });

            toast.success(response.data.message || "You will be notified soon!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setEmail(""); // Clear email input after successful submission
        } catch (error) {
            toast.error("Something went wrong. Please try again later.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error(error);
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-gray-500/80 w-[500px] h-18 rounded-md m-10">
                <input
                    type="text"
                    placeholder="Please enter your email address"
                    className="mr-4 text-white outline-none w-60 pl-4 m-1 h-14 bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className={`bg-white text-gray-700 w-32 h-14 m-1 rounded-md font-bold hover:bg-gray-100 transition-colors ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleChange}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Notify Me"}
                </button>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-center" // Positioned below the input box
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};
