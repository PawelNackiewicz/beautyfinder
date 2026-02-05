import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 16,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = rating >= starValue;
        const isHalfFilled = rating >= starValue - 0.5 && rating < starValue;

        return (
          <Star
            key={index}
            className={`${
              isFilled
                ? "fill-yellow-500 text-yellow-500"
                : isHalfFilled
                  ? "fill-yellow-500/50 text-yellow-500"
                  : "fill-gray-200 text-gray-200"
            }`}
            size={size}
          />
        );
      })}
    </div>
  );
}
