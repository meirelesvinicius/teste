<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carrinho 3D - Decoração</title>
  <style>
    body { margin: 0; overflow: hidden; background: #f0f0f0; }
    canvas { display: block; }
    .info {
      position: absolute;
      top: 10px;
      left: 10px;
      color: #333;
      font-family: Arial, sans-serif;
      background: rgba(255,255,255,0.8);
      padding: 10px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="info">
    <h2>🛒 Carrinho 3D</h2>
    <p>Arraste para girar • Scroll para zoom</p>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/controls/OrbitControls.js"></script>

  <script>
    // Cena básica
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Controles (OrbitControls)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI * 0.48;

    // Função para criar o carrinho
    function createShoppingCart() {
      const cart = new THREE.Group();

      // Cor principal (vermelho clássico)
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xff4d4d, 
        shininess: 30 
      });

      // Cesto do carrinho (grade)
      const basketGeo = new THREE.BoxGeometry(6, 4, 6);
      const basket = new THREE.Mesh(basketGeo, material);
      basket.position.y = 4;
      basket.castShadow = true;
      cart.add(basket);

      // Grade frontal
      const frontGrid = new THREE.Mesh(
        new THREE.PlaneGeometry(5.8, 3.8),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
      );
      frontGrid.position.set(0, 4, 3.01);
      cart.add(frontGrid);

      // Rodas
      const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
      const wheelGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 32);

      const positions = [
        [-2.8, 1, 2.8], [2.8, 1, 2.8],
        [-2.8, 1, -2.8], [2.8, 1, -2.8]
      ];

      positions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        wheel.castShadow = true;
        cart.add(wheel);
      });

      // Alça
      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 7, 0.6),
        new THREE.MeshPhongMaterial({ color: 0x333333 })
      );
      handle.position.set(0, 7, -2.5);
      handle.rotation.x = 0.3;
      cart.add(handle);

      cart.scale.set(0.8, 0.8, 0.8);
      return cart;
    }

    const shoppingCart = createShoppingCart();
    scene.add(shoppingCart);

    // Animação suave
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      shoppingCart.rotation.y += 0.002; // rotação automática leve
      renderer.render(scene, camera);
    }

    animate();

    // Responsivo
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>