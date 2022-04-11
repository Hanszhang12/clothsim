#version 330

uniform vec4 u_color;
uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

in vec4 v_position;
in vec4 v_normal;
in vec2 v_uv;

out vec4 out_color;

void main() {
  // YOUR CODE HERE
  float ka = 0.1;
  float I_a = 1.0;
  vec3 kd = u_color.xyz;
  float ks = 0.5;
  float p = 100;

  // (Placeholder code. You will want to replace it.)
  float r_2 = length(u_light_pos - v_position.xyz) * length(u_light_pos - v_position.xyz);
  vec3 illumination = u_light_intensity / r_2;
  vec3 first_half = (ka * I_a + kd * illumination * max(0.0, dot(normalize(v_normal), v_position)));

  vec3 h = (u_cam_pos + v_position.xyz) / length(u_cam_pos + v_position.xyz);
  vec3 second_half = ks * illumination * pow(max(0, dot(normalize(v_normal).xyz, h)), p);
  out_color = u_color * vec4(first_half + second_half, 1.0);
  out_color.a = 1;
}
