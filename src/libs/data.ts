import { Data, ResponseModel } from "@/types/data";
import { cache } from "react";

export const getData = cache(async (lang?: string) => {
    const res = await fetch(`https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang ?? 'en'}`, {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json() as ResponseModel;
    return data.data as Data;
});
