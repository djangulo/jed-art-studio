import editorObj from './youtubeEmbedEditorComponent';
import _ from 'lodash';

describe('Youtube embed regex pattern matches', () => {
  const { pattern } = editorObj;
  const getCase = (title, url) => `
  <figure class="video_container">
  <iframe title="${title}" src="${url}" frameborder="0" allowfullscreen="true"></iframe>
  </figure>
`;
  const cases = [
    getCase('React today', 'http://youtube.com/embed/dpw9EHDh2bM'),
    getCase('React today', 'http://youtube.com/embed/dpw9EHDh2bM?controls=0'),
    getCase('React today', 'http://youtube.com/embed/dpw9EHDh2bM?start=42'),
    getCase(
      'React today',
      'http://youtube.com/embed/dpw9EHDh2bM?controls=0&amp;start=42'
    ),
    getCase(
      'React today',
      'http://youtube.com/embed/dpw9EHDh2bM?start=42&amp;controls=0'
    ),
    getCase('React today', 'https://youtube.com/embed/dpw9EHDh2bM'),
    getCase('React today', 'https://youtube.com/embed/dpw9EHDh2bM?controls=0'),
    getCase('React today', 'https://youtube.com/embed/dpw9EHDh2bM?start=42'),
    getCase(
      'React today',
      'https://youtube.com/embed/dpw9EHDh2bM?controls=0&amp;start=42'
    ),
    getCase(
      'React today',
      'https://youtube.com/embed/dpw9EHDh2bM?start=42&amp;controls=0'
    ),
    getCase('React today', 'http://youtube-nocookie.com/embed/dpw9EHDh2bM'),
    getCase(
      'React today',
      'http://youtube-nocookie.com/embed/dpw9EHDh2bM?controls=0'
    ),
    getCase(
      'React today',
      'http://youtube-nocookie.com/embed/dpw9EHDh2bM?start=42'
    ),
    getCase(
      'React today',
      'http://youtube-nocookie.com/embed/dpw9EHDh2bM?controls=0&amp;start=42'
    ),
    getCase(
      'React today',
      'http://youtube-nocookie.com/embed/dpw9EHDh2bM?start=42&amp;controls=0'
    ),
    getCase('React today', 'https://youtube-nocookie.com/embed/dpw9EHDh2bM'),
    getCase(
      'React today',
      'https://youtube-nocookie.com/embed/dpw9EHDh2bM?controls=0'
    ),
    getCase(
      'React today',
      'https://youtube-nocookie.com/embed/dpw9EHDh2bM?start=42'
    ),
    getCase(
      'React today',
      'https://youtube-nocookie.com/embed/dpw9EHDh2bM?controls=0&amp;start=42'
    ),
    getCase(
      'React today',
      'https://youtube-nocookie.com/embed/dpw9EHDh2bM?start=42&amp;controls=0'
    )
  ];
  cases.map(c =>
    it(`${c} should not be null`, () => expect(c.match(pattern)).not.toBe(null))
  );
  it('should never be null', () => {
    expect(_.some(cases, c => c.match(pattern) === null)).toBe(false);
  });
});
