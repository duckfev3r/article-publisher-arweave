import React from 'react';
import './articleListCard.css'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

type Props = {
    article: any
}

function ArticleListCard(props: Props) {
    const { scribe_data, scribe_tags } = props.article;

    const { synopsis, title } = {
            synopsis: scribe_data[0].value,
            title: scribe_data[2].value
        }

    const chipValue = () => {
        let str = ''
        scribe_tags.forEach((tag: any, index: number) => {
            str += (index + 1 !== scribe_tags.length ? `${tag.value} • ` : `${tag.value} `).toUpperCase()
        })
        console.log(str)
        return str
    }
    return (
        <div className="article-list-card card">
            <h2>
                <Link to={`view/${props.article.id}`}>
                    {title}
                </Link>
            </h2>
            <div className="tags-heading">
                {/* <i>TAGS</i> */}
            </div>
            {scribe_tags.map((tag: any, index: number) => {
                return <Chip
                            key={tag.value}
                            onClick={() => console.log('clicked')}
                            label={tag.value.toUpperCase()}
                            className="chip"
                            variant="outlined"
                        />
            })}
            <p>
                {synopsis}
            </p>
            <div>
            </div>
        </div>

    );
}

export default ArticleListCard