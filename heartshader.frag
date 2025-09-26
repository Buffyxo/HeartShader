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

    // Default background colour (dark purple)
    vec3 color = vec3(0.1, 0.0, 0.2);

    // If the point is inside the heart (heartShape < 0), colour it red
    if(heartShape < 0.0)
        color = vec3(0.8, 0.0, 0.1);

    // Output the final pixel colour
    fragColor = vec4(color, 1.0);
}