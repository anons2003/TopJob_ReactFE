import React, { useState } from "react";
import NavbarDark from "../../components/navbarDark.js";
import Footer from "../../components/footer.js";
import ScrollTop from "../../components/scrollTop.js";
import { toast } from "react-toastify";
import useTemplate from "../../hook/useTemplate.js";
import 'react-toastify/dist/ReactToastify.css';
import { PuffLoader } from 'react-spinners';
import { FaUpload, FaTrash } from 'react-icons/fa';
import { initialTags } from "../../components/support.js"


export default function CreateTemplate() {
  const [formData, setFormData] = useState({
    title: "",
    name: ""
  });

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    uri: null,
    progress: 0,
    file: null
  });

  const [selectedTag, setSelectedTag] = useState([]);

  const {
    data: templates,
    isError: templatesIsError,
    isLoading: templateIsLoading,
    refetch: templateRefetch,
    mutation,
    deleteMutation
  } = useTemplate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      setImageAsset((prevAsset) => ({
        ...prevAsset,
        isImageLoading: true,
        file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          uri: reader.result,
          isImageLoading: false
        }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.info("Invalid file format");
    }
  };

  const deleteAnObject = () => {
    setImageAsset({
      isImageLoading: false,
      uri: null,
      progress: 0,
      file: null
    });
  };

  const handleSelectTags = (tag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter(selected => selected !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  const pushToCloud = async () => {
    if (imageAsset.file) {
      const templateDTO = {
        name: templates && templates.length > 0
          ? `Template ${templates.length + 1}`
          : "template 1",
        title: formData.title
      };
      mutation.mutate({ templateDTO, file: imageAsset.file });
    }
  };

  const removeTemplate = async (id) => {
    deleteMutation.mutate(id);
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];
    return allowedTypes.includes(file.type);
  };
  return (
    <>
      <NavbarDark />
      <section className="section">
        <div className="container">
          <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex-1 flex items-center justify-start flex-col gap-4 px-2">
              <div className="w-full">
                <p className="text-lg text-txtPrimary">Create a new Template</p>
              </div>
              <div className="w-full flex items-center justify-end">
                <p className="text-base text-txtLight uppercase font-semibold">Template ID:</p>
                <p className="text-sm text-txtDark capitalize font-botl">
                  {templates && templates.length > 0
                    ? `Template ${templates.length + 1}`
                    : "template 1"}
                </p>
              </div>
              <input
                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
                type="text"
                name="title"
                placeholder="Template title"
                value={formData.title}
                onChange={handleInputChange}
              />

              <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
                {imageAsset.isImageLoading ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <PuffLoader color="#0000FF" size={40} />
                    <p className="text-lg text-txtPrimary">Loading...</p>
                  </div>
                ) : (
                  <>
                    {!imageAsset.uri ? (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <FaUpload className="text-6xl text-txtPrimary" />
                        <p className="text-lg text-txtPrimary">Click to upload</p>
                        <input type="file" className="hidden" onChange={handleFileSelect} />
                      </label>
                    ) : (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <img src={imageAsset.uri} alt="uploaded" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white"
                          onClick={deleteAnObject}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {initialTags.map((tag, i) => (
                <div key={i} className={`border border-gray-400 px-2 py-1 rounded-md cursor-pointer ${selectedTag.includes(tag) ? "bg-blue-500 text-white" : ""}`} onClick={() => handleSelectTags(tag)}>
                  <p className="text-xs">{tag}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full py-3 rounded-md bg-green-500 text-white text-lg font-semibold"
              onClick={pushToCloud}
            >
              Save Template
            </button>
          </div>
          <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-green-200 px-2 w-full flex-1 py-4">
            right container
            {templateIsLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#498FCD" size={40} />
              </div>
            ) : (
              templates && templates.length > 0 ? (
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
                  {templates.map(template => (
                    <div key={template._id} className="w-full h-[500px] rounded-md overflow-hidden relative">
                      <img src={template.imageURL} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer" onClick={() => removeTemplate(template._id)}>
                        <FaTrash className="text-sm text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
                  <PuffLoader color="#498FCD" size={40} />
                  <p className="text-xl tracking-wider capitalize text-txtPrimary">
                    No data
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}
