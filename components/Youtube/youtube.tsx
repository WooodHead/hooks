import { NextPage } from "next";
import React from "react";

interface YoutubeProps {
	id: string;
}

const Youtube = ({ id }: YoutubeProps) => {
	return (
		<div>
			<iframe
				src={`https://www.youtube.com/embed/${id}`}
				allow="autoplay; encrypted-media"
				title="Embedded YouTube video"
			/>
		</div>
	);
};

export default Youtube;
