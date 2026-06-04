$file = "C:\Users\mathe\Downloads\portfolio.figma\index.html"
$lines = [System.IO.File]::ReadAllLines($file)
$newLines = [System.Collections.Generic.List[string]]$lines

# 1. Inserir React icon apos Figma na segunda pc-skill-row
# Buscar pela linha de Figma e inserir depois dela
$figmaIdx = -1
for ($i = 0; $i -lt $newLines.Count; $i++) {
    if ($newLines[$i] -match 'assets/images/figma\.png.*pc-tech-icon') {
        $figmaIdx = $i
        break
    }
}
$reactIcon = '                                                        <img src="imagens/react.svg" alt="React" class="pc-tech-icon" />'
if ($figmaIdx -ge 0) {
    $newLines.Insert($figmaIdx + 1, $reactIcon)
    Write-Host "React icon inserido apos linha $figmaIdx"
} else {
    Write-Host "ERRO: nao encontrou linha do Figma"
}

# 2. Inserir React na lista de habilidades apos Responsividade web
$reactLi = '                                                        <li>React</li>'
for ($i = 0; $i -lt $newLines.Count; $i++) {
    if ($newLines[$i] -match '<li>Responsividade web</li>') {
        $newLines.Insert($i + 1, $reactLi)
        Write-Host "React inserido na lista na linha $($i+1)"
        break
    }
}

# 3. Inserir EduConnect2 e Saber Aberto Web apos o </article> de Desafios
$newProjects = @(
    '                                <article class="pc-project-card">',
    '                                        <h3>EduConnect2</h3>',
    '                                        <p>Plataforma educacional para conectar alunos e professores, facilitando o acesso a conteudos e a comunicacao entre os usuarios.</p>',
    '                                        <div class="pc-project-tags">',
    '                                                <span>React</span><span>JavaScript</span>',
    '                                        </div>',
    '                                        <div class="pc-project-links">',
    '                                                <a href="https://github.com/matheustiburcio-sp/educonnect2" target="_blank" rel="noopener noreferrer">Codigo</a>',
    '                                        </div>',
    '                                </article>',
    '                                <article class="pc-project-card">',
    '                                        <h3>Saber Aberto Web</h3>',
    '                                        <p>Aplicacao web para compartilhamento de conhecimento de forma aberta e acessivel, promovendo o aprendizado colaborativo.</p>',
    '                                        <div class="pc-project-tags">',
    '                                                <span>HTML</span><span>CSS</span><span>JavaScript</span>',
    '                                        </div>',
    '                                        <div class="pc-project-links">',
    '                                                <a href="https://github.com/matheustiburcio-sp/saber-aberto-web" target="_blank" rel="noopener noreferrer">Codigo</a>',
    '                                        </div>',
    '                                </article>'
)

$desafiosArticleEnd = -1
for ($i = 0; $i -lt $newLines.Count; $i++) {
    if ($newLines[$i] -match 'Desafios de Logica e Front-end') {
        for ($j = $i; $j -lt $newLines.Count; $j++) {
            if ($newLines[$j].Trim() -eq '</article>') {
                $desafiosArticleEnd = $j
                break
            }
        }
        break
    }
}

if ($desafiosArticleEnd -ge 0) {
    for ($k = $newProjects.Length - 1; $k -ge 0; $k--) {
        $newLines.Insert($desafiosArticleEnd + 1, $newProjects[$k])
    }
    Write-Host "Projetos inseridos apos linha $desafiosArticleEnd"
} else {
    Write-Host "ERRO: nao encontrou </article> de Desafios"
}

[System.IO.File]::WriteAllLines($file, $newLines, [System.Text.Encoding]::UTF8)
Write-Host "Salvo com sucesso. Total linhas: $($newLines.Count)"
