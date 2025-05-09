import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import AuthForm from "./AuthForm";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black p-4">
      {/* Background watermarks */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10">
          <img
            src="https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=300&q=80"
            alt="DepEd Logo"
            className="w-40 h-40 object-contain"
          />
        </div>
        <div className="absolute bottom-10 right-10">
          <img
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=300&q=80"
            alt="School Logo"
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-4xl"
      >
        <Card className="bg-zinc-900 border-red-600 border-2 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left side - App title and info */}
              <div className="bg-zinc-800 p-8 md:w-1/2 flex flex-col justify-center">
                <motion.h1
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                    Alternative Delivery Mode
                  </span>
                </motion.h1>
                <motion.h2
                  className="text-xl md:text-2xl font-semibold mb-6 text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Grade Management System
                </motion.h2>
                <Separator className="my-4 bg-red-600/30" />
                <motion.p
                  className="text-gray-400 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Track student grades across multiple subjects with calculated
                  averages and pass/fail status.
                </motion.p>
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Developed by:
                  </h3>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>Francis Jon Andya</li>
                    <li>John Carlo Lobendino</li>
                    <li>Jeremy Lobendino</li>
                    <li>Jerwin Andaya</li>
                    <li>Carl John Benjay Siababa</li>
                  </ul>
                </motion.div>
              </div>

              {/* Right side - Auth form */}
              <div className="md:w-1/2 p-8 bg-zinc-900">
                <AuthForm />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
