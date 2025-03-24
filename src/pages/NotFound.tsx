import React from "react";
export interface Props {}

const PageNotFound: React.FC<Props> = (props) => {
	return (
		<div>
			<h1 style={{ fontSize: "64px" }}>404 Not found</h1>
		</div>
	);
};

export default PageNotFound;
