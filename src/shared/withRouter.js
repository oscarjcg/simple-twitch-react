import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
    const WithRouter = (props) => {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();

        return (
            <Component
                {...props}
                history={{ push: navigate }}
                match={{ params }}
                location={location} />
        );
    };
    return WithRouter;
};

export default withRouter;
