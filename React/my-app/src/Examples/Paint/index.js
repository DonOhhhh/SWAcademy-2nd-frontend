import { useState, useCallback, useEffect, useRef } from "react";
import { PenPlugin } from "./plugins";

const calculateCoord = (e, canvas) => {
    const rect = canvas.getBoundingClientRect(); // canvas의 위치를 알기 위해서 받는다.

    return {
        x: e.pageX - rect.left - window.scrollX,
        y: e.pageY - rect.top - window.scrollY,
    };
};

const Paint = ({
    command = "pen",
    color = "#000000",
    lineWidth = 1,
    width = 800,
    height = 600,
    plugins = [new PenPlugin()],
    style,
    className,
}) => {
    const [currentCommand, setCurrentCommand] = useState(command);
    const [currentLineWidth, setCurrentLineWidth] = useState(lineWidth);
    const [currentColor, setCurrentColor] = useState(color);
    const [currentPlugins, setCurrentPlugins] = useState({});
    const [drawing, setDrawing] = useState(false);

    const canvasRef = useRef();
    const scale = typeof window === "undefined" ? 1 : window.devicePixelRatio;

    const canvasDefaultStyle = {
        userSelect: "none",
        WebkitUserSelect: "none",
    };

    const canvasSizeStyle = {
        width,
        height,
    };

    useEffect(() => {
        setCurrentLineWidth(lineWidth);
    }, [lineWidth]);

    useEffect(() => {
        setCurrentCommand(command);
    }, [command]);

    useEffect(() => {
        setCurrentColor(color);
    }, [color]);

    useEffect(() => {
        plugins.forEach((plugin) => {
            plugin.canvas = canvasRef.current;
        });
        setCurrentPlugins(
            Object.assign(
                {},
                ...plugins.map((plugin) => ({
                    [plugin.name]: plugin,
                }))
            )
        );
    }, [canvasRef, plugins]);

    useEffect(() => {
        if (!canvasRef.current) return;
        canvasRef.current.width = width * scale;
        canvasRef.current.height = height * scale;

        canvasRef.current.getContext("2d").scale(scale, scale);
    }, [scale, width, height]);

    const handleDrawStart = useCallback(
        (e) => {
            e.preventDefault();
            const { x, y } = calculateCoord(e, canvasRef.current);
            currentPlugins[currentCommand].draw({
                x,
                y,
                width,
                height,
                scale,
                lineWidth: currentLineWidth,
                color: currentColor,
                state: "draw-started",
            });
            setDrawing(true);
        },
        [
            canvasRef,
            currentCommand,
            currentColor,
            currentLineWidth,
            currentPlugins,
            scale,
            width,
            height,
        ]
    );

    const handleDrawing = useCallback(
        (e) => {
            e.preventDefault();

            if (!drawing) return;
            const { x, y } = calculateCoord(e, canvasRef.current);
            currentPlugins[currentCommand].draw({
                x,
                y,
                width,
                height,
                scale,
                lineWidth: currentLineWidth,
                color: currentColor,
                state: "drawing",
            });
        },
        [
            canvasRef,
            currentCommand,
            currentColor,
            currentLineWidth,
            currentPlugins,
            drawing,
            scale,
            width,
            height,
        ]
    );

    const handleDrawFinish = useCallback(
        (e) => {
            e.preventDefault();
            if (!drawing) return;

            const { x, y } = calculateCoord(e, canvasRef.current);

            currentPlugins[currentCommand].draw({
                x,
                y,
                width,
                height,
                scale,
                lineWidth: currentLineWidth,
                color: currentColor,
                state: "draw-finished",
            });

            setDrawing(false);
        },
        [
            canvasRef,
            currentCommand,
            currentColor,
            currentLineWidth,
            currentPlugins,
            drawing,
            scale,
            width,
            height,
        ]
    );

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleDrawStart}
            onMouseMove={handleDrawing}
            onMouseUp={handleDrawFinish}
            style={{ ...canvasDefaultStyle, ...canvasSizeStyle, ...style }}
            className={className}
        />
    );
};

export default Paint;
