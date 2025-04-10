"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/constants/Testimonials ";

export default function TestimonialCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
	};

	const nextTestimonial = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="max-w-2xl  px-4 mx-auto   text-center">
			<Card className="relative p-4  border rounded-2xl bg-gray-200">
				<Quote className="absolute top-4 right-4 text-gray-500 w-8 h-8" />
				<CardHeader className="flex flex-col items-center">
					<Avatar className="w-16 h-16 border">
						<AvatarImage
							src={testimonials[currentIndex].avatar}
							alt={testimonials[currentIndex].name}
						/>
						<AvatarFallback>
							{testimonials[currentIndex].name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<CardTitle className="mt-1 text-lg">
						{testimonials[currentIndex].name}
					</CardTitle>
					<p className="text-sm text-gray-500">
						{testimonials[currentIndex].role}
					</p>
				</CardHeader>
				<CardContent className="text-gray-700 text-base ">
					<p className="">{testimonials[currentIndex].testimonial}</p>
					<div className="flex justify-between gap-4 mt-1">
						<Button variant="outline" size="icon" onClick={prevTestimonial}>
							<ChevronLeft className="w-5 h-5" />
						</Button>
						<Button variant="outline" size="icon" onClick={nextTestimonial}>
							<ChevronRight className="w-5 h-5" />
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Navigation Buttons */}
		</div>
	);
}
