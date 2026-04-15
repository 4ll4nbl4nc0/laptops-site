import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

const labelMap = {
  gaming: 'Gaming',
  office: 'Oficina',
  creator: 'Diseño y edición',
  business: 'Empresarial',
}

function FiltersPanel({ filters, setFilters, availableFilters }) {
  const toggleValue = (key, value) => {
    setFilters((current) => {
      const bucket = current[key]
      return {
        ...current,
        [key]: bucket.includes(value)
          ? bucket.filter((item) => item !== value)
          : [...bucket, value],
      }
    })
  }

  return (
    <Stack spacing={2.2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Filtros</Typography>
        <Button
          size="small"
          startIcon={<RestartAltRoundedIcon />}
          onClick={() =>
            setFilters({
              category: [],
              brand: [],
              os: [],
              useCase: [],
              ram: [],
              storage: [],
              processor: [],
              gpu: [],
              screen: [],
              resolution: [],
              condition: [],
              availability: false,
              price: [0, 4000],
              view: 'grid',
            })
          }
        >
          Limpiar
        </Button>
      </Stack>

      {[
        ['category', 'Categoría'],
        ['brand', 'Marca'],
        ['os', 'Sistema operativo'],
        ['useCase', 'Uso recomendado'],
        ['ram', 'RAM'],
        ['storage', 'Almacenamiento'],
        ['processor', 'Procesador'],
        ['gpu', 'Tarjeta gráfica'],
        ['screen', 'Pantalla'],
        ['resolution', 'Resolución'],
        ['condition', 'Condición'],
      ].map(([key, label]) => (
        <Accordion
          key={key}
          disableGutters
          defaultExpanded={['category', 'brand', 'os', 'useCase'].includes(key)}
          sx={{
            bgcolor: 'transparent',
            border: '1px solid rgba(31,42,51,0.08)',
            borderRadius: '18px !important',
            overflow: 'hidden',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography fontWeight={700}>{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxHeight: 160, overflowY: 'auto', pr: 0.5 }}>
              {(availableFilters[key] || []).map((value) => (
                <Chip
                  key={value}
                  size="small"
                  label={labelMap[value] || value}
                  clickable
                  color={filters[key].includes(value) ? 'primary' : 'default'}
                  variant={filters[key].includes(value) ? 'filled' : 'outlined'}
                  onClick={() => toggleValue(key, value)}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Accordion
        disableGutters
        defaultExpanded
        sx={{
          bgcolor: 'transparent',
          border: '1px solid rgba(31,42,51,0.08)',
          borderRadius: '18px !important',
          overflow: 'hidden',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
          <Typography fontWeight={700}>Precio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <Slider
              value={filters.price}
              onChange={(_, value) => setFilters((current) => ({ ...current, price: value }))}
              valueLabelDisplay="auto"
              min={0}
              max={4000}
              step={100}
            />
            <Typography color="text.secondary">
              Rango: ${filters.price[0]} - ${filters.price[1]}
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <FormControlLabel
        control={
          <Switch
            checked={filters.availability}
            onChange={(event) =>
              setFilters((current) => ({ ...current, availability: event.target.checked }))
            }
          />
        }
        label="Solo disponibilidad inmediata"
        sx={{ mx: 0 }}
      />

      <RadioGroup
        value={filters.view}
        onChange={(event) => setFilters((current) => ({ ...current, view: event.target.value }))}
      >
        <FormControlLabel value="grid" control={<Radio />} label="Vista grid" />
        <FormControlLabel value="list" control={<Radio />} label="Vista lista" />
      </RadioGroup>
    </Stack>
  )
}

export default FiltersPanel
