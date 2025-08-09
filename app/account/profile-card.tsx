"use client";
import { User } from "@supabase/supabase-js";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileCard = ({ user }: { user: User | null }) => {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [joinAt, setJoinAt] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const handleClickWebsite = () => {
    if (website) {
      router.push(website);
    }
  };

  if (loading) {
    <Skeleton className="h-sm w-sm rounded-lg" />;
  }

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `full_name, username, website, avatar_url, status ,system_role, created_at`
        )
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error.message;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setRole(data.system_role);
        setJoinAt(data.created_at.slice(0, 4).toLocaleString());

        const { data: avatar, error } = await supabase.storage
          .from("avatars")
          .download(data.avatar_url);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(avatar);
        setAvatarUrl(url);

        toast.success("Welcome back, " + data.full_name, {
          description: "System Role : " + data.system_role.toUpperCase(),
        });
      }
    } catch (error) {
      toast.error("Error loading user data!", {
        description: "Error: " + error,
      });
      //alert("Error loading user data!" + error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);
  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            font-family: system-ui, sans-serif;
          }
          
          .hover-scale {
            transition: transform 700ms ease-out;
          }
          
          .hover-scale:hover {
            transform: scale(1.02);
          }
          
          .image-scale {
            transition: transform 700ms ease-out;
          }
          
          .image-container:hover .image-scale {
            transform: scale(1.03);
          }
          
          .hover-translate {
            transition: transform 500ms ease-out;
          }
          
          .hover-translate:hover {
            transform: translateX(4px);
          }
          
          .hover-scale-sm {
            transition: transform 500ms ease-out;
          }
          
          .hover-scale-sm:hover {
            transform: scale(1.1);
          }
        `}
      </style>

      <div className="w-full h-auto  flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg dark:shadow-2xl dark:shadow-black/80 overflow-hidden hover-scale mx-4">
            <div className="relative overflow-hidden image-container">
              <img
                src={avatar_url || "/placeholder.svg"}
                alt={fullname || "Avatar"}
                className="w-full aspect-square object-cover image-scale"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 dark:from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute top-6 left-6 ">
                <div className="flex flex-col items-start justify-between gap-2">
                  <h2 className="text-2xl font-medium text-white drop-shadow-lg">
                    {fullname}
                  </h2>
                  <h4 className="text-sm font-medium text-white drop-shadow-lg">
                    {role}
                  </h4>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden hover-scale-sm ring-2 ring-gray-200 dark:ring-zinc-700">
                  <img
                    src={avatar_url || "/placeholder.svg"}
                    alt={fullname || "Avatar"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="hover-translate">
                  <div className="text-sm text-gray-700 dark:text-zinc-200 capitalize">
                    {username}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-zinc-500 capitalize">
                    {role}, Join at {joinAt}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleClickWebsite();
                }}
                className="bg-gray-900 dark:bg-zinc-800 text-white dark:text-zinc-100 rounded-lg px-4 py-2 text-sm font-medium
                         transition-all duration-500 ease-out transform hover:scale-105 
                         hover:bg-gray-800 dark:hover:bg-zinc-700
                         active:scale-95 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/50"
              >
                Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
