"use client";

import TypeIt from "typeit-react";

const TypingText = () => {
	return (
		<div className="App">
			<TypeIt
				options={{
					speed: 50,
					deleteSpeed: 50,
					loop: true,
					breakLines: false, // Prevents new lines
				}}
				getBeforeInit={(instance) => {
					instance
						.type("Image Generation ")
						.pause(1300)
						.delete()
						.pause(700)
						.type("Chatbot ")
						.pause(1300)
						.delete()
						.pause(700)
						.type("Code Generation ")
						.pause(1300)
						.delete()
						.pause(700)
						.go();
					return instance;
				}}
			/>
		</div>
	);
};

export default TypingText;
