import { useScript } from "deco/hooks/useScript.ts";

let hideMenuTimeout: number;

const onMouseEnter = () => {
  clearTimeout(hideMenuTimeout);
  const imageMenu = document.getElementById("image-menu");
  if (imageMenu) {
    imageMenu.style.display = "block";
  }
};

const onMouseLeave = () => {
  hideMenuTimeout = setTimeout(() => {
    const imageMenu = document.getElementById("image-menu");
    if (imageMenu) {
      imageMenu.style.display = "none";
    }
  }, 200); // 200ms delay
};

const onDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const dragArea = document.getElementById("drag-area");
  if (dragArea) {
    dragArea.classList.add("border-dashed", "border-2", "border-gray-400");
  }
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "copy";
  }
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const dragArea = document.getElementById("drag-area");
  if (dragArea) {
    dragArea.classList.remove("border-dashed", "border-2", "border-gray-400");
  }
  if (e.dataTransfer) {
    const files = e.dataTransfer.files;
    handleFiles(files);
  }
};

const handleFiles = (files: FileList) => {
  // Handle the dropped files
  console.log(files);
};

export default function ImageSearch() {
  return (
    <div
      class="relative"
      hx-on:mouseenter={useScript(onMouseEnter)}
      hx-on:mouseleave={useScript(onMouseLeave)}
    >
      <label
        for="image-upload"
        class="cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#131313"
        >
          <path d="M18 13v7H4V6h5.02c.05-.71.22-1.38.48-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5l-2-2zm-1.5 5h-11l2.75-3.53 1.96 2.36 2.75-3.54L16.5 18zm2.8-9.11c.44-.7.7-1.51.7-2.39C20 4.01 17.99 2 15.5 2S11 4.01 11 6.5s2.01 4.5 4.49 4.5c.88 0 1.7-.26 2.39-.7L21 13.42 22.42 12 19.3 8.89zM15.5 9C14.12 9 13 7.88 13 6.5S14.12 4 15.5 4 18 5.12 18 6.5 16.88 9 15.5 9zado" />
        </svg>
      </label>
      <div
        id="image-menu"
        style="display: none;"
        class="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10"
        hx-on:dragenter={useScript(onDragEnter)}
        hx-on:dragover={useScript(onDragOver)}
        hx-on:drop={useScript(onDrop)}
      >
        <div class="p-4">
          <div id="drag-area" class="p-4 border-2 border-gray-300 rounded-md">
            <p class="text-sm text-gray-500">Drag an image here</p>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            class="hidden"
          />
          <button class="mt-2 bg-black text-white px-4 py-2 rounded-md">
            Upload a photo
          </button>
          <p class="text-xs text-gray-500 mt-2">
            *For quick search, press CTRL+V to paste an image into the search
            box
          </p>
        </div>
      </div>
    </div>
  );
}
