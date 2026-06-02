import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CalendarDays, ClipboardList, ImagePlus, Plus, Syringe, UserRound } from "lucide-react"
import { getAuth } from "../../services/auth"
import { createMedication, createPig, listMedications, listPigs } from "../../services/suinos"
import "./Suinos.css"

const today = new Date().toISOString().slice(0, 10)

const emptyPigForm = {
  name: "",
  tag: "",
  breed: "",
  sex: "",
  birth_date: "",
  weight_kg: "",
  status: "ativo",
  notes: "",
}

const emptyMedicationForm = {
  pig: "",
  medicine_name: "",
  active_principle: "",
  dose: "",
  route: "outra",
  applied_at: today,
  withdrawal_until: "",
  responsible: "",
  notes: "",
}

function Suinos() {
  const [pigs, setPigs] = useState([])
  const [medications, setMedications] = useState([])
  const [pigForm, setPigForm] = useState(emptyPigForm)
  const [medicationForm, setMedicationForm] = useState(emptyMedicationForm)
  const [selectedPigId, setSelectedPigId] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingPig, setIsSavingPig] = useState(false)
  const [isSavingMedication, setIsSavingMedication] = useState(false)
  const [pigPhoto, setPigPhoto] = useState(null)
  const [pigPhotoPreview, setPigPhotoPreview] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let isActive = true

    if (!getAuth()?.token) {
      navigate("/login")
      return undefined
    }

    async function loadData() {
      setIsLoading(true)
      setMessage("")

      try {
        const [pigData, medicationData] = await Promise.all([listPigs(), listMedications()])
        if (!isActive) return
        setPigs(pigData)
        setMedications(medicationData)
        if (pigData[0]?.id) {
          setSelectedPigId(String(pigData[0].id))
          setMedicationForm((current) => ({ ...current, pig: String(pigData[0].id) }))
        }
      } catch (error) {
        if (isActive) setMessage(error.message)
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadData()

    return () => {
      isActive = false
    }
  }, [navigate])

  const selectedPig = useMemo(
    () => pigs.find((pig) => String(pig.id) === String(selectedPigId)),
    [pigs, selectedPigId]
  )

  const selectedPigMedications = useMemo(
    () => medications.filter((record) => String(record.pig) === String(selectedPigId)),
    [medications, selectedPigId]
  )

  const dashboard = useMemo(() => {
    const treatmentCount = pigs.filter((pig) => pig.status === "tratamento").length
    const currentMonth = new Date().toISOString().slice(0, 7)
    const monthMedicationCount = medications.filter((record) => record.applied_at?.startsWith(currentMonth)).length

    return {
      totalPigs: pigs.length,
      treatmentCount,
      medicationCount: medications.length,
      monthMedicationCount,
    }
  }, [pigs, medications])

  const handlePigChange = (event) => {
    const { name, value } = event.target
    setPigForm((current) => ({ ...current, [name]: value }))
  }

  const handlePigPhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setPigPhoto(file)
    setPigPhotoPreview(URL.createObjectURL(file))
  }

  const handleMedicationChange = (event) => {
    const { name, value } = event.target
    setMedicationForm((current) => ({ ...current, [name]: value }))
  }

  const handleSelectPig = (pigId) => {
    setSelectedPigId(String(pigId))
    setMedicationForm((current) => ({ ...current, pig: String(pigId) }))
  }

  const handleCreatePig = async (event) => {
    event.preventDefault()
    setIsSavingPig(true)
    setMessage("")

    const payload = new FormData()
    Object.entries(pigForm).forEach(([key, value]) => {
      if (value !== "") payload.append(key, value)
    })
    if (pigPhoto) payload.append("photo", pigPhoto)

    try {
      const createdPig = await createPig(payload)
      setPigs((current) => [...current, createdPig])
      handleSelectPig(createdPig.id)
      setPigForm(emptyPigForm)
      setPigPhoto(null)
      setPigPhotoPreview("")
      setMessage("Suino cadastrado com sucesso.")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSavingPig(false)
    }
  }

  const handleCreateMedication = async (event) => {
    event.preventDefault()
    setIsSavingMedication(true)
    setMessage("")

    const payload = Object.fromEntries(
      Object.entries(medicationForm).filter(([, value]) => value !== "")
    )

    try {
      const createdMedication = await createMedication(payload)
      setMedications((current) => [createdMedication, ...current])
      setMedicationForm((current) => ({
        ...emptyMedicationForm,
        pig: current.pig,
        applied_at: today,
      }))
      setMessage("Aplicacao registrada com sucesso.")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSavingMedication(false)
    }
  }

  if (isLoading) {
    return (
      <main className="suinos-page">
        <section className="suinos-shell">
          <p className="suinos-message">Carregando suínos...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="suinos-page">
      <section className="suinos-shell">
        <header className="suinos-header">
          <div>
            <span className="suinos-kicker">Controle sanitário</span>
            <h1>Suínos cadastrados</h1>
            <p>Registre cada animal e acompanhe medicamentos aplicados por data.</p>
          </div>
          <div className="suinos-header-icon">
            <ClipboardList size={34} strokeWidth={1.7} />
          </div>
        </header>

        <div className="suinos-stats">
          <article>
            <UserRound size={20} strokeWidth={1.7} />
            <span>Total de suínos</span>
            <strong>{dashboard.totalPigs}</strong>
          </article>
          <article>
            <Syringe size={20} strokeWidth={1.7} />
            <span>Aplicações registradas</span>
            <strong>{dashboard.medicationCount}</strong>
          </article>
          <article>
            <CalendarDays size={20} strokeWidth={1.7} />
            <span>Aplicações no mês</span>
            <strong>{dashboard.monthMedicationCount}</strong>
          </article>
          <article>
            <Plus size={20} strokeWidth={1.7} />
            <span>Em tratamento</span>
            <strong>{dashboard.treatmentCount}</strong>
          </article>
        </div>

        {message && <p className="suinos-message">{message}</p>}

        <div className="suinos-layout">
          <aside className="suinos-panel">
            <h2>Cadastrar suíno</h2>
            <form className="suinos-form" onSubmit={handleCreatePig}>
              <label className="suinos-photo-field">
                <span className="suinos-photo-preview">
                  {pigPhotoPreview ? <img src={pigPhotoPreview} alt="" /> : <ImagePlus size={24} strokeWidth={1.7} />}
                </span>
                <span>
                  <strong>Imagem do suíno</strong>
                  <small>Selecione uma foto para identificar o animal.</small>
                </span>
                <input type="file" accept="image/*" onChange={handlePigPhotoChange} />
              </label>
              <label>
                <span>Nome ou identificação</span>
                <input name="name" value={pigForm.name} onChange={handlePigChange} required />
              </label>
              <label>
                <span>Brinco / código</span>
                <input name="tag" value={pigForm.tag} onChange={handlePigChange} />
              </label>
              <label>
                <span>Raça / linhagem</span>
                <input name="breed" value={pigForm.breed} onChange={handlePigChange} />
              </label>
              <div className="suinos-form-row">
                <label>
                  <span>Sexo</span>
                  <select name="sex" value={pigForm.sex} onChange={handlePigChange}>
                    <option value="">Selecione</option>
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                  </select>
                </label>
                <label>
                  <span>Status</span>
                  <select name="status" value={pigForm.status} onChange={handlePigChange}>
                    <option value="ativo">Ativo</option>
                    <option value="tratamento">Em tratamento</option>
                    <option value="vendido">Vendido</option>
                    <option value="obito">Óbito</option>
                  </select>
                </label>
              </div>
              <div className="suinos-form-row suinos-form-row-spaced">
                <label>
                  <span>Nascimento</span>
                  <input type="date" name="birth_date" value={pigForm.birth_date} onChange={handlePigChange} />
                </label>
                <label>
                  <span>Peso kg</span>
                  <input type="number" step="0.01" name="weight_kg" value={pigForm.weight_kg} onChange={handlePigChange} />
                </label>
              </div>
              <label>
                <span>Observações</span>
                <textarea name="notes" value={pigForm.notes} onChange={handlePigChange} rows="3" />
              </label>
              <button type="submit" disabled={isSavingPig}>
                {isSavingPig ? "Salvando..." : "Cadastrar suíno"}
              </button>
            </form>
          </aside>

          <section className="suinos-panel suinos-list-panel">
            <div className="suinos-panel-title">
              <h2>Meus suínos</h2>
              <span>{pigs.length} cadastrados</span>
            </div>

            <div className="suinos-list">
              {pigs.length === 0 && <p className="suinos-empty">Nenhum suíno cadastrado ainda.</p>}
              {pigs.map((pig) => (
                <button
                  key={pig.id}
                  type="button"
                  className={String(selectedPigId) === String(pig.id) ? "suinos-pig-card suinos-pig-card-active" : "suinos-pig-card"}
                  onClick={() => handleSelectPig(pig.id)}
                >
                  {pig.photo_url && <img src={pig.photo_url} alt="" className="suinos-pig-thumb" />}
                  <strong>{pig.name}</strong>
                  <span>{pig.tag || "Sem código"} · {pig.status}</span>
                  <small>{pig.medications_count || 0} aplicações</small>
                </button>
              ))}
            </div>
          </section>

          <section className="suinos-panel suinos-med-panel">
            <div className="suinos-panel-title">
              <h2>Medicações</h2>
              <span>{selectedPig ? selectedPig.name : "Selecione um suíno"}</span>
            </div>

            <form className="suinos-form" onSubmit={handleCreateMedication}>
              <label>
                <span>Suíno</span>
                <select name="pig" value={medicationForm.pig} onChange={handleMedicationChange} required>
                  <option value="">Selecione o suíno</option>
                  {pigs.map((pig) => (
                    <option key={pig.id} value={pig.id}>{pig.name}</option>
                  ))}
                </select>
              </label>
              <div className="suinos-form-row">
                <label>
                  <span>Medicamento</span>
                  <input name="medicine_name" value={medicationForm.medicine_name} onChange={handleMedicationChange} required />
                </label>
                <label>
                  <span>Princípio ativo</span>
                  <input name="active_principle" value={medicationForm.active_principle} onChange={handleMedicationChange} />
                </label>
              </div>
              <div className="suinos-form-row">
                <label>
                  <span>Dose</span>
                  <input name="dose" value={medicationForm.dose} onChange={handleMedicationChange} />
                </label>
                <label>
                  <span>Via</span>
                  <select name="route" value={medicationForm.route} onChange={handleMedicationChange}>
                    <option value="oral">Oral</option>
                    <option value="intramuscular">Intramuscular</option>
                    <option value="subcutanea">Subcutânea</option>
                    <option value="topica">Tópica</option>
                    <option value="outra">Outra</option>
                  </select>
                </label>
              </div>
              <div className="suinos-form-row">
                <label>
                  <span>Data de aplicação</span>
                  <input type="date" name="applied_at" value={medicationForm.applied_at} onChange={handleMedicationChange} required />
                </label>
                <label>
                  <span>Carência até</span>
                  <input type="date" name="withdrawal_until" value={medicationForm.withdrawal_until} onChange={handleMedicationChange} />
                </label>
              </div>
              <label>
                <span>Responsável</span>
                <input name="responsible" value={medicationForm.responsible} onChange={handleMedicationChange} />
              </label>
              <label>
                <span>Observações</span>
                <textarea name="notes" value={medicationForm.notes} onChange={handleMedicationChange} rows="3" />
              </label>
              <button type="submit" disabled={isSavingMedication || pigs.length === 0}>
                {isSavingMedication ? "Registrando..." : "Registrar aplicação"}
              </button>
            </form>

            <div className="suinos-med-list">
              {selectedPigMedications.length === 0 && <p className="suinos-empty">Nenhuma aplicação para este suíno.</p>}
              {selectedPigMedications.map((record) => (
                <article key={record.id}>
                  <strong>{record.medicine_name}</strong>
                  <span>{record.applied_at} · {record.dose || "Dose não informada"} · {record.route}</span>
                  {record.withdrawal_until && <small>Carência até {record.withdrawal_until}</small>}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default Suinos
