import api from "./api";
import axios, { type AxiosResponse } from "axios";

const apiKey = "MeJ9yXbaCnQB8bwfrDDrUQW3bicFP4VcbPLWeVCH"

export const getSources = () => api.get(`/v1/sources/?apiKey=${apiKey}`)

export const getRegions = () => api.get(`/v1/regions/?apiKey=${apiKey}`)

export const getNetworks = () => api.get(`/v1/networks/?apiKey=${apiKey}`)

export const getGenres = () => api.get(`/v1/genres/?apiKey=${apiKey}`)

export const getSearch = (
    searchField: string,
    searchValue: string,
    types: string | undefined
) => api.get(`/v1/search/?apiKey=${apiKey}&search_field=${searchField}&search_value=${encodeURIComponent(searchValue)}&types=${types}`)

export const getAutocomplete = (
    searchValue: string,
    searchType: number
) => api.get(`/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${encodeURIComponent(searchValue)}&search_type=${searchType}`)

export const getTitleDetails = (
    titleId: string,
    appendToResponse: string | undefined,
    language: string | undefined,
    regions: string | undefined
) => api.get(`/v1/title/${titleId}/details/?apiKey=${apiKey}&language=${language}`)

export const getTitleStreamingSources = (
    titleId: string,
    regions: string | undefined
) => api.get(`/v1/title/${titleId}/sources/?apiKey=${apiKey}`)

export const getTitleSeasons = (
    titleId: string
) => api.get(`/v1/title/${titleId}/seasons/?apiKey=${apiKey}`)

export const getTitleEpisodes = (
    titleId: string
) => api.get(`/v1/title/${titleId}/episodes/?apiKey=${apiKey}`)

export const getTitleCast_Crew = (
    titleId: string,
    language: string | undefined
) => api.get(`/v1/title/${titleId}/cast-crew/?apiKey=${apiKey}&language=${language}`)

export const getListTitles = (
    types: string | undefined,
    regions: string | undefined,
    languages: string[] | undefined,
    sourceTypes: string | undefined,
    sourceIds: string,
    genres: string | undefined,
    networkIds: string | undefined,
    sortBy: string | undefined,
    releaseDateStart: number | undefined,
    releaseDateEnd: number | undefined,
    userRatingHigh: number | undefined,
    userRatingLow: number | undefined,
    criticScoreHigh: number | undefined,
    criticScoreLow: number | undefined,
    personId: number | undefined,
    page: number | undefined,
    limit: number | undefined
) => api.get(`/v1/list-titles/?apiKey=${apiKey}&source_ids=${sourceIds}&types=${types}&sortBy=${sortBy}`)

export const getStreamingReleases = (
    startDate?: number,
    endDate?: number,
    limit?: number
) => api.get(`/v1/releases/?apiKey=${apiKey}`)

export const getPerson = (
    personId: number
) => api.get(`/v1/person/${personId}?apiKey=${apiKey}`)

export const getNewTitles = (
    startDate: number | undefined,
    endDate: number | undefined,
    types: string,
    page: number | undefined,
    limit: number | undefined
) => api.get(`/v1/changes/new_titles?apiKey=${apiKey}&types=${types}`)

export const getNewPeople = (
    startDate: number | undefined,
    endDate: number | undefined,
    page: number | undefined,
    limit: number | undefined
) => api.get(`/v1/changes/new_people/?apiKey=${apiKey}`)

export const getTitlesWithChangedSources = (
    startDate: number | undefined,
    endDate: number | undefined,
    types: string | undefined,
    regions: string | undefined,
    page: number | undefined,
    limit: number | undefined
) => api.get(`/v1/changes/titles_sources_changed/?apiKey=${apiKey}&types=${types}`)

export const getTitlesWithChangedDetails = (
    startDate: number | undefined,
    endDate: number | undefined,
    types: string | undefined,
    page: number | undefined,
    limit: number | undefined
) => api.get(`/v1/changes/titles_details_changed/?apiKey=${apiKey}&types=${types}`)

export const getTitlesWithChangedEpisodes = (
    startDate: number | undefined,
    endDate: number | undefined,
    page: number | undefined,
    limit: number | undefined
) => api.get(`/v1/changes/titles_episodes_changed/?apiKey=${apiKey}`)