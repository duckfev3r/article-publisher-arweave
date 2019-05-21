import * as sanitizeHtml from 'sanitize-html'
import ReactHtmlParser from 'react-html-parser';

const opts = {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
        'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img'],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        // We don't currently allow img itself by default, but this
        // would make sense if we did. You could add srcset here,
        // and if you do the URL is checked for safety
        img: ['src']
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    // URL schemes we permit
    allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesByTag: { img: ['data'] },
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
}

export default function sanitize(content: string): string {
    return sanitizeHtml(content, opts)
}


