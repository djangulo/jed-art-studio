import React from "react";
import { WidgetPreviewContainer } from "netlify-cms-ui-default";
import YoutubeEmbed from "./../YoutubeEmbed";

const YoutubeEmbedPreview = props => {
  return (
    <WidgetPreviewContainer>
      {props.videoId ? <YoutubeEmbed {...props} /> : null}
    </WidgetPreviewContainer>
  );
};

YoutubeEmbedPreview.propTypes = YoutubeEmbed.propTypes;

export default YoutubeEmbedPreview;
