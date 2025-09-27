void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Convert pixel position (fragCoord) into coordinates between -1 and 1
    // so the origin (0,0) is in the middle of the screen
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv * 2.0 - 1.0;

    // Stretch x so that the shape isn’t distorted if the screen isn’t square
    uv.x *= iResolution.x / iResolution.y;

    // Define x and y from our coordinate system
    float x = uv.x;
    float y = uv.y;

    // Equation of a heart curve (implicit form):
    // (x² + y² − 0.3)³ − x²y³
    // Points where this < 0 lie *inside* the heart
    float heartShape = pow(x*x + y*y - 0.3, 3.0) - x*x*y*y*y;

    // base color
    vec3 bgColor = vec3(0.1, 0.0, 0.2); // dark purple background
    vec3 heartColor = vec3(0.8, 0.0, 0.1); // red heart
    
    // Glow effect
    float glow = 0.005 / (abs(heartShape) + 0.001); 

    // Start with background colour, then add a faint purple glow
    vec3 color = bgColor + vec3(0.5, 0.0, 0.2) * glow;

    // If the pixel is inside the heart, use the heart colour,
    // but still add the same glow effect on top
    if(heartShape < 0.0)
        color = heartColor + vec3(0.5, 0.0, 0.2) * glow;

    // Output the final pixel colour
    fragColor = vec4(color, 1.0);
}