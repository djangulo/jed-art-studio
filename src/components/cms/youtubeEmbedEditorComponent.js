import React from 'react';
import YoutubeEmbedPreview from './youtubeEmbedPreview';

export default {
  // Internal id of the component
  id: 'youtubeEmbed',
  // Visible label
  label: 'Youtube Embed',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: 'videoId', label: 'Youtube Video ID', widget: 'string' },
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
      required: true,
      default: ''
    },
    {
      name: 'startAt',
      label: 'Start at (seconds)',
      widget: 'number',
      default: 0,
      min: 0,
      valueType: 'int',
      required: false
    },
    {
      name: 'privacyMode',
      label: 'Privacy mode (no tracking)',
      widget: 'boolean',
      default: true,
      required: false
    },
    {
      name: 'showControls',
      label: 'Show controls',
      widget: 'boolean',
      default: true,
      required: false
    }
  ],
  // Pattern to identify a block as being an instance of this component
  // /^.*\/\/[^/]+/
  pattern: /.* (title="([:-_a-zA-Z0-9\s]+)")* src="(https?:\/\/(www)?youtube(-nocookie)?\.com\/embed\/?([a-zA-Z0-9]*)\??(.*)?)" f/m,
  // Function to extract data elements from the regexp match
  fromBlock: match => {
    const start = match[7].match(/start=(\d+)/)[1];
    const noControls = match[7].match(/controls=0/)[1];

    return (
      match && {
        title: match[2],
        videoId: match[6],
        startAt: start ? start : 0,
        showControls: noControls ? false : true,
        privacyMode: match[5] ? true : false
      }
    );
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    const { privacyMode, startAt, showControls, videoId, title } = obj;
    let videoUrl = privacyMode
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : `https://www.youtube.com/embed/${videoId}`;
    if (!showControls || startAt !== 0) videoUrl += '?';
    if (!showControls && startAt !== 0) {
      videoUrl += `controls=0&amp;start=${startAt}`;
    } else if (!showControls && startAt === 0) {
      videoUrl += `controls=0`;
    } else {
      videoUrl += `start=${startAt}`;
    }

    return `
    <figure class="video_container">
      <iframe title="${title}" src="${videoUrl}" frameborder="0" allowfullscreen="true"></iframe>
    </figure>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    console.log(obj);
    return <YoutubeEmbedPreview {...obj} />;
  }
};
