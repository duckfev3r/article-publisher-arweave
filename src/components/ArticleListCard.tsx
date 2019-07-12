import React from 'react';
import './articleListCard.css'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import unixToDateTime from '../utils/datetime'
import { Link } from 'react-router-dom';

type Props = {
    article: any,
    onTagClick: (tag: string) => void
}

function ArticleListCard(props: Props) {
    const { scribe_data, scribe_tags } = props.article;
    const { synopsis, title } = {
        synopsis: scribe_data[0] ? scribe_data[0].value : '',
        title: scribe_data[2] ? scribe_data[2].value : ''
    }

    return (
        <div className="article-list-card card">
            <Link to={`/view/${props.article.id}`}>
                <img src={props.article.image}/>
            </Link>
            <h2>
                <Link to={`/view/${props.article.id}`}>
                    {title}
                </Link>
            </h2>
            {/* <div className="tags-heading">
                {tagline}
            </div> */}
            <div className="info">
                <div className='list-date'>
                    {unixToDateTime(props.article.unixTime)}
                </div>

            </div>
            <p>
                {synopsis}
            </p>
           
           <div className="about-post">
                <div className="tags">
                    {scribe_tags.map((tag: any, index: number) => {
                        return <Link to={`/explore/${tag.value.toLowerCase()}`} className="tag" key={index}>
                            #{tag.value.toUpperCase()}
                        </Link>
                    })}
                </div>
           </div>

        </div>

    );
}

export default ArticleListCard