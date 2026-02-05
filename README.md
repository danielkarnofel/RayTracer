# RayTracer

*Software-based ray tracer implemented in JavaScript*

RayTracer is a software ray tracing renderer implemented from first principles using **JavaScript** and the HTML5 **Canvas** API. The project demonstrates the fundamentals of ray–scene intersection, shading, shadows, reflections, and geometric transformations without relying on external graphics libraries.

The renderer operates entirely on the CPU and renders to a fixed-resolution image plane in the browser.

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

---

## Rendering Architecture

### Ray generation
For each pixel, rays are generated from the camera origin through pixel centers (and sub-pixel offsets for anti-aliasing). Directions are normalized and traced into the scene.

### Intersection testing
Each scene object implements a `raycast` method that returns intersection data including:
- hit status  
- intersection point  
- surface normal  
- distance from ray origin  

The closest valid intersection is selected per ray.

### Shading and recursion
At an intersection:
1. Local illumination is computed using the surface normal and light direction.
2. Shadow rays determine whether the point is occluded.
3. If the material is reflective and recursion depth allows, a reflected ray is spawned and traced recursively.
4. Local and reflected contributions are combined based on material reflectivity.

---

## Math & Utilities

The project includes custom implementations of:

- 3D vectors (`Vector3`)
- 3×3 matrices (`Matrix3`) with inversion
- Rays (`Ray`)

These utilities support:
- coordinate transformations  
- normal computation  
- reflection direction calculation  
- object-space intersection logic  
