import React from 'react';
import { Location, NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom';

export interface RouterProps {
    history: { push: NavigateFunction };
    // Route params are always present on the routes that use them.
    match: { params: Record<string, string> };
    location: Location;
}

const withRouter = <P extends RouterProps>(Component: React.ComponentType<P>) => {
    const WithRouter = (props: Omit<P, keyof RouterProps>) => {
        const navigate = useNavigate();
        const params = useParams() as Record<string, string>;
        const location = useLocation();

        const routerProps: RouterProps = {
            history: { push: navigate },
            match: { params },
            location,
        };

        return <Component {...(props as P)} {...routerProps} />;
    };
    return WithRouter;
};

export default withRouter;
