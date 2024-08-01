import { useState } from "react";
import Box from "./box"

export default function Movies({ children }) {
    return (
        <Box>
            {children }
        </Box>
    )
}