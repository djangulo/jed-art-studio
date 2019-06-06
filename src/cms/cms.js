import React from "react";
import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import TranslatedSlugControl from "./../components/cms/translatedSlugControl";

import YoutubeEmbedPreview from "../components/cms/youtubeEmbedPreview";

CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);

CMS.registerWidget("translatedSlug", TranslatedSlugControl);

CMS.registerEditorComponent({
  // Internal id of the component
  id: "youtubeEmbed",
  // Visible label
  label: "Youtube Embed",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "videoId", label: "Youtube Video ID", widget: "string" },
    {
      name: "startAt",
      label: "Start at (seconds)",
      widget: "number",
      default: 0,
      min: 0,
      valueType: "int",
      required: false
    },
    {
      name: "privacyMode",
      label: "Privacy mode (no tracking)",
      widget: "boolean",
      default: true,
      required: false
    },
    {
      name: "showControls",
      label: "Show controls",
      widget: "boolean",
      default: true,
      required: false
    }
  ],
  // Pattern to identify a block as being an instance of this component
  // /^.*\/\/[^/]+/
  pattern: /.*youtube(-nocookie)?.*[^\/]+(\/embed\/)([a-zA-Z0-9]*)\??(controls=0)?(&amp;)?(start=(\d+))?/,
  // Function to extract data elements from the regexp match
  fromBlock: match =>
    match && {
      videoId: match[4],
      startAt: match[8] ? parseInt(match[8], 10) : 0,
      showControls: match[5] ? true : false,
      privacyMode: match[2] ? true : false
    },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    const { privacyMode, startAt, showControls, videoId } = obj;
    let videoUrl = privacyMode
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : `https://www.youtube.com/embed/${videoId}`;
    if (!showControls || startAt !== 0) videoUrl += "?";
    if (!showControls && startAt !== 0) {
      videoUrl += `controls=0&amp;start=${startAt}`;
    } else if (!showControls && startAt === 0) {
      videoUrl += `controls=0`;
    } else {
      videoUrl += `start=${startAt}`;
    }

    return `<figure class="video_container"><iframe src="${videoUrl}" frameborder="0" allowfullscreen="true"></iframe></figure>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    console.log(obj);
    return <YoutubeEmbedPreview {...obj} />;
  }
});
