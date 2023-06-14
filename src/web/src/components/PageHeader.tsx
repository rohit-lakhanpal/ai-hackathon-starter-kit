// Create a new Functional Component called PageHeader.tsx that uses Matrial's Typography component to display the page title and subtitle. The component should accept two props: title and subtitle. The component should be exported as default.
// This component get a Title and Subtitle as props and displays them using Material's Typography component.
// Path: src/components/PageHeader.tsx
import React, { FC, ReactElement } from "react";
import { Typography } from "@mui/material";

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }): ReactElement => {
    return (
        <>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>
        </>
    );
};

export default PageHeader;