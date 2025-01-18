"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GetEmail = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission refresh

        if (!email) {
            toast.error("Enter a Valid Email Address", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        setIsLoading(true);

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
            setEmail("");
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
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
            >
                <div className="w-full bg-gray-500/80 rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3">
                    <input
                        type="email"
                        placeholder="Please enter your email address"
                        className="w-full text-white outline-none px-4 py-3 bg-transparent placeholder:text-gray-300 text-sm sm:text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full sm:w-32 px-4 py-3 bg-white text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base
                            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Notify Me"}
                    </button>
                </div>
            </form>

            <ToastContainer
                position="top-center"
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