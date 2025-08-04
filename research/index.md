---
layout: default
title: Research
permalink: /research/
---

# Research

<div style="display: flex; align-items: flex-start; gap: 20px;">
  <div style="flex: 1;">
    <p>
      For as long as I can remember, I have always been fascinated by technology and driven by an eagerness to discover new things through curiosity. This passion stems from my father, whose role in shaping my research career has been vital. He introduced me to technology when I was a young child, and together with my mother, consistently encouraged me to pursue a career in science and engineering.
    </p>
    <p>
      I spent my early days playing with Legos and memorizing the Star Wars saga. When I was old enough, I received my first Lego Mindstorms set, which was truly a game changer. Through it, I learned to program basic instructions, read sensor data, and debug my numerous mistakes. Most importantly, it sparked a fundamental question that continues to drive my research today: <b>How do machines interact with our world?</b>
    </p>
    <p>
      I'm currently enrolled in a Bioinformatics B.Sc. at the University of Málaga. Thanks to opportunities provided by many brilliant professors, I have been fortunate to conduct research in Computer Vision for Biomedical Applications since my third year as an undergraduate, while spending much of my free time exploring robotics, genomic analysis, and mathematics.
    </p>
    
  </div>
  <div style="flex: 0 0 300px;">
    <figure style="margin: 0;">
      <img src="assets/images/research/little_me.jpeg" alt="Research workspace" style="width: 100%; height: auto; border-radius: 8px;">
      <figcaption style="margin-top: 8px; font-size: 0.9em; color: #666; text-align: center; font-style: italic;">
        Hospital Universitario Puerta de Hierro, Madrid, Spain (2004)
      </figcaption>
    </figure>
  </div>
</div>

---

## <span style="display: block; font-size: 0.7em; color: #666; margin-bottom: 5px;">2021-Present</span><a href="https://ibima.eu/es/project/f-02/">Computational Intelligence and Image Analysis Group</a><span style="display: block; font-size: 0.85em; color: #777; margin-top: 8px;">University of Málaga</span>


<div style="display: flex; align-items: flex-start; gap: 20px;">
  <div style="flex: 0 0 300px;">
    <figure style="margin: 0;">
      <img src="assets/images/research/icai.jpeg" alt="Description of image" style="width: 100%; height: auto; border-radius: 8px;">
      <figcaption style="margin-top: 8px; font-size: 0.9em; color: #666; text-align: center; font-style: italic;">
        Lab 3.3.5-B, School of Computer Engineering
      </figcaption>
    </figure>
  </div>
  <div style="flex: 1;">
    <p>
      I first encountered Artificial Intelligence during the fifth semester of my Bioinformatics B.Sc, while being enrolled in the course "Intelligent Systems". There, I met <a href="https://orcid.org/0000-0001-8231-5687">Ezequiel López-Rubio, PhD</a>, who recognized my enthusiasm for AI and agreed to mentor me in the field. Under his guidance, I began developing projects that gradually strengthened my deep learning programming skills, with the ultimate goal of preparing me for my bachelor's thesis research.
    </p>
    <p>
      At the end of my third year, Ezequiel and <a href="https://orcid.org/0000-0002-8547-9393">Esteban-José Palomo Ferrer, PhD</a> offered me a Research Assistant position to work on Deep Learning approaches for detecting and characterizing stenosis lesions in invasive coronary angiography videos. This position, affiliated with the <a href="https://ibima.eu/es/">Biomedical Research Institute of Málaga (IBIMA)</a>, provided me with invaluable hands-on research experience in medical computer vision, where I continue to work today.
    </p>

  </div>
</div>

### Publications during my stay

<div class="publications">
  <div class="publication">
    <p class="citation">M. Pascual-González, A. Jiménez-Partinen, E. J. Palomo, E. López-Rubio, and A. Ortega-Gómez, "Hyperparameter optimization of YOLO models for invasive coronary angiography lesion detection and assessment," <em>Computers in Biology and Medicine</em>, vol. 196, p. 110697, 2025, doi: 10.1016/j.compbiomed.2025.110697.</p>
    <div class="pub-actions">
      <a class="pub-link" href="https://doi.org/10.1016/j.compbiomed.2025.110697" target="_blank">Paper</a>
      <a class="pub-link" href="https://github.com/MarioPasc/Coronary_Angiography_Detection" target="_blank">Code</a>
      <button class="copy-ref" data-ref='@article{pascual2025hyperparameter,
  title={Hyperparameter optimization of YOLO models for invasive coronary angiography lesion detection and assessment},  author={Pascual-Gonzalez, Mario and Jimenez-Partinen, Ariadna and Palomo, Esteban J and Lopez-Rubio, Ezequiel and Ortega-Gomez, Almudena},
  journal={Computers in Biology and Medicine},
  volume={196},
  pages={110697},
  year={2025},
  publisher={Elsevier}
}
'>Copy citation</button>
    </div>
    <details class="pub-comments">
      <summary>Personal Comments</summary>
      <p>
        My first scientific publication. Leaving the statistical analysis aside, the code provides an easy tool that is able to integrate the hyperparameter optimization of any YOLO variant using the <a href="https://optuna.readthedocs.io/en/stable/"> <em>Optuna</em></a> framework. You only have to define your trainer at <code>optimization/engine/trainers</code>. The script <code>optimization/engine/hpo.py</code> will catch your trainer class and optimize it with the configuration you defined (see example at <code>optimization/cfg/files/picasso/yaml</code>), where you must write your trainer class in the <code>model_source</code> entry.

      </p>
    </details>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.copy-ref').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var text = this.getAttribute('data-ref');
      navigator.clipboard.writeText(text).then(() => {
        var original = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => { this.textContent = original; }, 2000);
      });
    });
  });
});
</script>
