import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import TranslatedSlugControl from './../components/cms/translatedSlugControl';

import youtubeEmbedEditorComponent from '../components/cms/youtubeEmbedEditorComponent';

CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);

CMS.registerWidget('translatedSlug', TranslatedSlugControl);

CMS.registerEditorComponent(youtubeEmbedEditorComponent);
