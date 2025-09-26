import logo from "./logo.svg";
import "./App.css";
import { Document, Page, pdfjs } from "react-pdf";
import PdfFile from "./PORTFOLIO22-25.pdf";
import HTMLFlipBook from "react-pageflip";
import { useRef, useState } from "react";
import React from "react";
import TextType from "./components/TextType/TextType";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Squares from "./components/bg_Squares/Squares";
import PixelCard from "./components/PixelCard/PixelCard";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [clicked, setClicked] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const HTMLFlipBookRef = useRef();
  const bookWidth = width > 576 ? width * 0.6 : width;

  const onButtonClick = (e) => {
    console.log("click", HTMLFlipBookRef);
    setClicked(true);
    setTimeout(() => {
      window.scrollTo(0, HTMLFlipBookRef.current.offsetTop);
    }, 1000);
  };

  return (
    <div className="App">
      <header className="App-header font-mono text-2xl text-left overflow-hidden">
        <Squares
          speed={0.2}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#fff"
        />
        <div className="py-16 px-8 z-10 absolute top-0 left-0 w-full h-full">
          <div className="h-32 w-2x96 text-2xl whitespace-pre-wrap bold">
            <TextType
              text={["Ludovica Baiardi \nArchitect \nPortfolio 2022-2025"]}
              pauseDuration={3000}
              cursorCharacter="|"
            />
          </div>
          <div className="relative h-[80px] w-[250px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <PixelCard
              variant="black"
              className="cursor-pointer h-full w-full bg-black hover:bg-white hover:text-black rounded-sm absolute left-50 top-0 shadow-xl border-white border-1/2"
            >
              <div
                onClick={onButtonClick}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center p-4 opacity-90 text-base"
              >
                Check my Portfolio
              </div>
            </PixelCard>
          </div>
        </div>
      </header>
      <div
        className={`App-body flex justify-center items-center overflow-y-hidden py-64`}
        // ref={HTMLFlipBookRef}
      >
        <Document
          file={PdfFile}
          onLoadError={console.error}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <span id="flipbook" ref={HTMLFlipBookRef}></span>
          <HTMLFlipBook
            width={bookWidth}
            height={height}
            className="shadow-lg"
            style={{}}
            startPage={0}
            showCover={false}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="flex justify-center">
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={bookWidth}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      </div>
    </div>
  );
}

export default App;
