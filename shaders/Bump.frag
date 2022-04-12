#version 330

uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

uniform vec4 u_color;

uniform sampler2D u_texture_2;
uniform vec2 u_texture_2_size;

uniform float u_normal_scaling;
uniform float u_height_scaling;

in vec4 v_position;
in vec4 v_normal;
in vec4 v_tangent;
in vec2 v_uv;

out vec4 out_color;

float h(vec2 uv) {
  // You may want to use this helper function...
  return texture(u_texture_2, uv).r;
}

void main() {
  // YOUR CODE HERE

  // (Placeholder code. You will want to replace it.)
  mat3 TBN;
  TBN[0] = v_tangent.xyz;
  TBN[1] = cross(v_normal.xyz, v_tangent.xyz);
  TBN[2] = v_normal.xyz;

  float width = u_texture_2_size[0];
  float height = u_texture_2_size[1];

  float h1 = h(vec2(v_uv[0] + 1.0/width, v_uv[1]));
  float h2 = h(vec2(v_uv[0], v_uv[1] + 1.0/height));

  float d_U = u_normal_scaling * u_height_scaling * (h1 - h(v_uv));
  float d_V = u_normal_scaling * u_height_scaling * (h2 - h(v_uv));
  vec3 n_0 = vec3(-d_U, -d_V, 1.0);
  vec4 n_d = vec4(TBN * n_0, 1);


  float ka = 0.1;
  float I_a = 1.0;
  vec3 kd = u_color.xyz;
  float ks = 0.5;
  float p = 100;

  float r_2 = length(u_light_pos - v_position.xyz) * length(u_light_pos - v_position.xyz);
  vec3 illumination = u_light_intensity / r_2;
  vec3 first_half = (ka * I_a + kd * illumination * max(0.0, dot(n_d, v_position)));

  vec3 h = (u_cam_pos + v_position.xyz) / length(u_cam_pos + v_position.xyz);
  vec3 second_half = ks * illumination * pow(max(0, dot((n_d).xyz, h)), p);
  out_color = u_color * vec4(first_half + second_half, 1.0);
  out_color.a = 1;

}
