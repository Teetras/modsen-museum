import React from "react";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import OtherWorksSection from "../../components/otherWorksSection/OtherWorksSection";
import "./home.css";
import GallerySection from "../../components/gallerySection/GallerySection";
import SearchSection from "../../components/searchSection/SearchSection";

export default function Home() {
  return (
    <div className="layout">
      <ErrorBoundary>
        <SearchSection />
        <GallerySection />
        <OtherWorksSection />
      </ErrorBoundary>
    </div>
  );
}
