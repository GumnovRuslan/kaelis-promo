import { notFound } from "next/navigation";

// This page is only here to catch all non-existent routes and return a 404
const CatchAll = () => notFound();

export default CatchAll;