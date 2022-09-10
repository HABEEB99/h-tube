import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button/Button";
import PageLayout from "../components/layout/PageLayout";
import { categories } from "../lib/categories";
import client from "../lib/client";
import { SanityAssetDocument } from "@sanity/client";
import ReactPlayer from "react-player";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoCloudUpload } from "react-icons/go";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { BASE_URL } from "../lib/utils";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

type CreatePostProps = {};

interface FormInputs {
  category: string;
  title: string;
  caption: string;
}

const CreatePost: React.FC<CreatePostProps> = () => {
  const router = useRouter();

  const { user }: { user: any } = useAuthStore();

  const [playVideo, setPlayVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [videoFile, setVideoFile] = useState<SanityAssetDocument | undefined>();
  const [invalidFile, setInvalidFile] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);

  const postVideo = async (e: any) => {
    const chosenFile = e.target.files[0];
    const validFiles = ["video/mp4", "video/webm", "video/ogg"];
    setLoading(true);
    if (validFiles.includes(chosenFile.type)) {
      client.assets
        .upload("file", chosenFile, {
          contentType: chosenFile.type,
          filename: chosenFile.name,
        })
        .then((data) => {
          setVideoFile(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setInvalidFile(true);
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const submitPost: SubmitHandler<FormInputs> = async ({
    category,
    title,
    caption,
  }) => {
    setPosting(true);
    if (!videoFile?._id) {
      toast.error("Please upload a video");
      return;
    }
    const postDoc = {
      _type: "post",
      title,
      category,
      caption,
      video: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: videoFile?._id,
        },
      },
      userId: user?._id,
      postedBy: {
        _type: "postedBy",
        _ref: user?._id,
      },
    };

    await axios.post(`${BASE_URL}/api/posts`, postDoc);

    setPosting(false);

    router.push("/");
  };

  return (
    <PageLayout title="CREATE POST" description="Create a post">
      <div className="w-full md:w-[80%] md:mx-auto py-4 h-full px-4 md:px-0  ">
        <h1 className="text-xl md:text-2xl font-bold">Create a Post</h1>

        <div className="mt-4 flex items-center min-h-40">
          {videoFile ? (
            <div className="flex flex-col">
              <div>
                <div
                  onMouseEnter={() => setPlayVideo(true)}
                  onMouseLeave={() => setPlayVideo(false)}
                  className="pt-[56.25%] relative w-full lg:w-80 h-60"
                >
                  <ReactPlayer
                    url={videoFile.url}
                    controls={playVideo}
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  />
                </div>

                <div onClick={() => setVideoFile(null!)}>
                  <Button className="w-40 h-10 bg-red-600 hover:bg-red-800 text-white">
                    Remove Video
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3">
              <div onClick={() => videoRef.current?.click()}>
                <Button className="w-40 h-10 bg-white dark:bg-gray-600 text-blue-300">
                  <GoCloudUpload className="font-bold text-xl mr-2" />
                  Upload Video
                </Button>
              </div>
              {loading && (
                <div className="flex items-center space-x-1">
                  <AiOutlineLoading3Quarters className="text-2xl animate-spin text-green-300" />
                  <span className="text-xl text-green-500 animate-pulse">
                    Uploading Video....
                  </span>
                </div>
              )}
              <input
                hidden
                ref={videoRef}
                type="file"
                placeholder="Upload Video"
                onChange={postVideo}
                className="w-40 h-10 bg-white dark:bg-gray-600 text-blue-300"
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(submitPost)} className="w-full mt-4">
          <div className="flex items-center space-x-3 w-full mt-4">
            <div className="w-full">
              <label
                htmlFor="categories"
                className="text-btn text-sm font-bold"
              >
                Select Category
              </label>
              <select
                className="w-full h-10 outline-none"
                id="categories"
                {...register("category")}
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full relative pt-6">
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="placeholder-transparent peer w-full h-10 outline-none px-2"
                {...register("title", {
                  required: true,
                })}
              />
              <label
                htmlFor="title"
                className="absolute peer-placeholder-shown:left-2 left-0 peer-placeholder-shown:top-8 top-1 text-btn peer-focus:top-1 peer-focus:text-btn font-bold peer-focus:text-sm"
              >
                Title
              </label>

              {errors.title && (
                <span className="text-sm text-red-600 animate-pulse pt-2">
                  {errors.title.type === "required" && "Title is required"}
                </span>
              )}
            </div>
          </div>
          <div className="w-full mt-10 relative">
            <textarea
              id="caption"
              className="w-full h-40 placeholder-transparent peer outline-none px-2"
              placeholder="Caption"
              {...register("caption", {
                required: true,
              })}
            />
            <label
              htmlFor="caption"
              className="absolute peer-placeholder-shown:left-2 left-0 peer-placeholder-shown:top-0 text-btn -top-6 peer-focus:-top-6  peer-focus:text-btn font-bold peer-focus:text-sm"
            >
              Caption
            </label>

            {errors.caption && (
              <span className="text-sm text-red-600 animate-pulse">
                {errors.caption.type === "required" && "Caption is required"}
              </span>
            )}
          </div>

          <div className="w-full mt-6">
            <button
              type="submit"
              className="w-full h-10 rounded-lg bg-btn hover:bg-btnHover text-white font-bold text-xl"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};
export default CreatePost;
