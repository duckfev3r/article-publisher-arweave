import React from 'react';
import './article-list-card.css'
import { prefix } from '../services/ApiService';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

type Props = {
    article: any
}

function ArticleListCard(props: Props) {
    const { scribe_data, scribe_tags } = props.article;

    // const bull = <span className='bullet'>•</span>;

    return (
        <div className="article-list-card card">
            <h2>
            <Link to={'view'}>
            {scribe_data[`${prefix}-title`]}
             </Link>
            </h2>
            <p>
                {scribe_data[`${prefix}-synopsis`]}
            </p>
            {scribe_tags.map((tag: any) => {
                return <Chip
                    key={tag.value}
                    // onClick={() => console.log('clicked')}
                    label={tag.value.toUpperCase()}
                    className="chip"
                    variant="outlined"
                />
            })}
            <Divider />
        </div>

    );
}

export default ArticleListCard