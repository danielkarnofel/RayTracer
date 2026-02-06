# RayTracer

A software-based Cornell Box ray tracing renderer implemented using **JavaScript** and the HTML5 **Canvas** API. The project demonstrates the fundamentals of ray–scene intersection, shading, shadows, reflections, and geometric transformations without relying on external graphics libraries.

The renderer operates entirely on the CPU and renders to a fixed-resolution image plane in the browser. The framerate is genuinely terrible, depending on the reflection depth, but at a low resolution it is capable of nearly-real-time animation of dynamic scenes.

---

## Features

- **Perspective camera model**  
  Rays are generated per pixel using a configurable field of view, with camera geometry derived analytically.

- **Geometric primitives**  
  The scene supports multiple analytic primitives, each with its own ray–intersection implementation:
  - Spheres  
  - Planes  
  - Disks  
  - Oriented boxes (via object-space transforms)
 
- **Reusable Materials**  
  All scene elements are inherited from an abstract SceneObject class, which supports the creation of reusable and extensible materials, allowing simple management of properties like color and reflectivity.

- **Object-space transformations**  
  Scene objects support rotation through explicit construction and inversion of 3×3 rotation matrices, with rays transformed into object space for intersection testing.

- **Local illumination and shadows**  
  Surface shading is computed using surface normals and a point light source, with shadow rays cast to determine occlusion.

- **Recursive reflections**  
  Reflective materials are supported via recursive ray tracing with a configurable maximum recursion depth.

- **Supersampling anti-aliasing**  
  Each pixel is sampled multiple times using a rotated sampling pattern and averaged to reduce aliasing artifacts.

- **Animated scene elements**  
  Object rotation and light position are updated over time to demonstrate dynamic scenes.

