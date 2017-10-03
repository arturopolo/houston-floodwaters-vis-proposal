# houston-floodwaters-vis-proposal

## Objetivo
Presentar los niveles de inundación registrados en la ciudad de Houston antes, durante y después de la tormenta a partir de la información recuperada de los sensores instalados en diferentes alcantarillas.

## Tratamiento del DATASET
La visualización diseñada parte de tener un DATASET de la siguiente forma:

<ul>
<li>Barrio: variable categórica.</li>
<li>NivelMaximo: Derivada secuencial. Nivel máximo promedio que puede ser registrado en los sensores instalados en las alcantarillas de un barrio en específico.</li>
<br>
<li>NivelPromedioRegistradoAntes: Derivada secuencial. Nivel promedio registrado en los sensores antes de la tormenta.</li>
<li>DiferenciaNivelesAntes: Derivado divergente. Diferencia entre el Nivel máximo promedio y el nivel promedio registrado antes de la tormenta.</li>
<li>IndiceAntes: Derivado divergente. Normalización del atributo derivado llamado DiferenciaNivelesAntes. Básicamente si la diferencia es mayor o igual a 2, se asume 2, y si la diferencia es menor o igual a -2, se asume -2.</li>
<br>
<li>NivelPromedioRegistradoDurante: Derivado secuencial. Nivel promedio registrado en los sensores durante la tormenta.</li>
<li>DiferenciaNivelesDurante: Derivado divergente. Diferencia entre el nivel máximo promedio y el nivel promedio registrado durante la tormenta.</li>
<li>IndiceDurante: Derivado divergente. Normalización del atributo derivado llamado DiferenciaNivelesDurante. Básicamente si la diferencia es mayor o igual a 2, se asume 2, y si la diferencia es menor o igual a -2, se asume -2.</li>
<br>
<li>NivelPromedioRegistradoDespues: Derivado secuencial. Nivel promedio registrado en los sensores después de la tormenta.</li>
<li>DiferenciaNivelesDespues: Derivado divergente. Diferencia entre el nivel máximo promedio y el nivel promedio registrado después de la tormenta.</li>
<li>IndiceDespues: Derivado divergente. Normalización del atributo derivado llamado DiferenciaNivelesDespues. Básicamente si la diferencia es mayor o igual a 2, se asume 2, y si la diferencia es menor o igual a -2, se asume -2.</li>
</ul>

# HeatMap
Como visualización se implementó un HeatMap que combina dos variables categóricas con una cuantitativa divergente.
<ul>
<li>Clasificación Tiempo (Categórica): Antes, durante o después de la tormenta</li>
<li>Nombre del barrio (Categórica)</li>
<li>Indice diferencias de niveles (Divergente)</li>
</ul>

## Escala Divergente
Al ser una variable divergente se usó la saturación para indicar las diferentes escalas de valores. 
El rango de valores de los índices fluctua entre -2 y 2 para maximizar su identificación y capacidad de resalte.

# Componentes interactivos
Cada vez que el MOUSE pasa por encima de uno de los cuadros que compone el HEATMAP muestra 4 valores:
<ul>
<li>El nivel máximo promedio de los sensores instalados en las alcantarillas de ese barrio.</li>
<li>El nivel promedio registrado, antes o durante o después de la tormenta, en los sensores instalados en las alcantarillas de ese barrio.</li>
<li>La diferencia entre el nivel máximo promedio y el nivel promedio registrado de ese barrio.</li>
<li>El índice normalizado de la diferencia calculada entre el nivel máximo promedio y el nivel promedio registrado de ese barrio.</li>
</ul>
